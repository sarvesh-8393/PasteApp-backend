import mongoose from "mongoose";
import Pastemodel from "../model/Pastemodel.js";
import { useParams } from "react-router-dom";

export const newPaste = async (req, res) => {
  try {
    const { title, content, Permissions } = req.body;
    const userId = req.user.id;
    const newPaste = new Pastemodel({
      title,
      content,
      Permissions,
      owner: userId,
    });
    await newPaste.save();
    res.status(201).json(newPaste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save paste" });
  }
};

export const getUserPaste = async (req, res) => {
  try {
    const userId = req.user.id;
    const allPastes = await Pastemodel.find({ owner: userId });

    if (allPastes.length > 0) {
      return res.status(200).json(allPastes);
    } else {
      return res.status(404).json({ message: "No pastes found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pastes" });
  }
};

export const getAllPaste = async (req, res) => {
  try {
    const allPastes = await Pastemodel.find({ Permissions: "Public" }).populate("owner", "name");

    if (allPastes.length > 0) {
      return res.status(200).json(allPastes);
    } else {
      return res.status(404).json({ message: "No public pastes found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pastes" });
  }
};


export const getIdPaste = async (req, res) => {
  try {

  
const paste = await Pastemodel.findById(req.params.id).populate("owner", "name");


    if (!paste) {
      return res.status(404).json({ error: "No such paste" }); // ✅ Fixed typo
    } else {
      paste.views = paste.views + 1;
      await paste.save();
      return res.status(200).json(paste);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch paste" }); // ✅ Minor message fix
  }
};
export const getUserIdPaste = async (req, res) => {
  try {
    const userId = req.params.id;


    const pastes = await Pastemodel.find({ owner: userId }).populate("owner", "name");

    if (!pastes || pastes.length === 0) {
      return res.status(404).json({ error: "No pastes found for this user." });
    }

    // ✅ No need to update views here (that’s for viewing a single paste)
    return res.status(200).json(pastes);
  } catch (err) {
    console.error("Error fetching user pastes:", err);
    res.status(500).json({ error: "Failed to fetch user's pastes." });
  }
};
export const getPopular=async (req, res) => {
  try {
    
 const pastes = await Pastemodel.find({ Permissions: "Public" })
      .populate("owner", "name")
      .sort({ views: -1 });

    if (!pastes || pastes.length === 0) {
      return res.status(404).json({ error: "No pastes found for this user." });
    }

    // ✅ No need to update views here (that’s for viewing a single paste)
    return res.status(200).json(pastes);
  } catch (err) {
    console.error("Error fetching user pastes:", err);
    res.status(500).json({ error: "Failed to fetch user's pastes." });
  }
};
export const getRecent = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extract userId from verified token

    const pastes = await Pastemodel.find({ owner: userId })
      .populate("owner", "name")
      .sort({ createdAt: -1 });

    if (!pastes || pastes.length === 0) {
      return res.status(404).json({ error: "No pastes found." });
    }

    return res.status(200).json(pastes);
  } catch (err) {
    console.error("Error fetching recent pastes:", err);
    res.status(500).json({ error: "Failed to fetch recent pastes." });
  }
};
export const putUpdate = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { id } = req.params;  // 🆔 Paste ID from URL
     
    const { title, content } = req.body; // 📝 New data

    // 1. Find the paste by ID
    const paste = await Pastemodel.findById(id);

  
    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }
    if (paste.owner.toString() !== userId) {
      return res.status(403).json({ error: "You are not allowed to edit this paste" });
    }

    // 3. Update the paste
    paste.title = title;
    paste.content = content;
    await paste.save();

    return res.status(200).json({ message: "Paste updated successfully", paste });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update paste" });
  }
};

export const deletePaste = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const paste = await Pastemodel.findById(id);

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    if (userId !== paste.owner.toString()) {
      return res.status(403).json({ error: "You are not allowed to delete this paste" });
    }

    await paste.deleteOne(); // ✅ Deletes this specific paste

res.status(200).json({ message: "Paste deleted successfully", title: paste.title });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete paste" });
  }
};


