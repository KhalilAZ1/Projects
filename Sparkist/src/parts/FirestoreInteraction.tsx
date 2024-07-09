// src/firestoreService.ts
import { db } from '../firebase.ts';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

/**
 * Retrieves all documents from a Firestore collection.
 * @param {string} collectionName
 * @returns {Promise<any[]>}
 */
export const getAllDocuments = async (collectionName: string): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

/**
 * Adds a new document to a Firestore collection.
 * @param {string} collectionName - The name of the collection to add the document to.
 * @param {object} data - The data object to be added as a new document.
 * @returns {Promise<string>} - A promise that resolves to the ID of the added document.
 */
export const addDocument = async (collectionName: string, data: object): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

/**
 * Removes a document from a Firestore collection.
 * @param {string} collectionName - The name of the collection to remove the document from.
 * @param {string} documentId - The ID of the document to be removed.
 * @returns {Promise<void>} - A promise that resolves when the document is successfully removed.
 */
export const removeDocument = async (collectionName: string, documentId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    console.error('Error removing document:', error);
    throw error;
  }
};

/**
 * Updates a document in a Firestore collection.
 * @param {string} collectionName - The name of the collection containing the document to update.
 * @param {string} documentId - The ID of the document to update.
 * @param {object} newData - The updated data object to replace the existing document data.
 * @returns {Promise<void>} - A promise that resolves when the document is successfully updated.
 */
export const updateDocument = async (collectionName: string, documentId: string, newData: object): Promise<void> => {
  try {
    await updateDoc(doc(db, collectionName, documentId), newData);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};
