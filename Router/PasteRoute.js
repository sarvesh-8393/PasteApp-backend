import express from 'express';
import {getAllPaste, newPaste,getUserPaste, getIdPaste,getUserIdPaste,getPopular,getRecent,putUpdate,deletePaste} from '../controller/PasteController.js';
import {verifyToken} from '../middleware/Auth.Middleware.js';

const PasetRouter = express.Router(); // ✅ Correct usage

PasetRouter.post('/new',verifyToken ,newPaste);
PasetRouter.get('/getUser',verifyToken, getUserPaste );

PasetRouter.get('/getall', verifyToken, getAllPaste);          // Static
PasetRouter.get('/popular', verifyToken, getPopular);
PasetRouter.get('/recent', verifyToken, getRecent);           // Static
PasetRouter.get('/user/:id', verifyToken, getUserIdPaste); 
PasetRouter.put('/update/:id', verifyToken, putUpdate);
PasetRouter.delete('/delete/:id', verifyToken, deletePaste);     // Semi-dynamic
PasetRouter.get('/:id', verifyToken, getIdPaste);              // Dynamic - ALWAYS LAST



export default PasetRouter;