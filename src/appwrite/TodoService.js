import { Client, Databases } from "appwrite";
import conf from "../conf/conf";  // Import configuration file
import { Query } from "appwrite";


const client = new Client();
client
  .setEndpoint(conf.appwriteurl)  // Set Appwrite endpoint
  .setProject(conf.appwriteprojectid);  // Set Project ID

const databases = new Databases(client);

const databaseId = conf.appwriteDataBaseId; // Get database ID from conf
const collectionId = conf.appwriteCollectionId; // Get collection ID from conf
const todoService = {
  async addTodo({ title, userId }) {
    if (!title || !userId) {
      throw new Error("Missing required fields: title or userId");
    }

    try {
      const data = {
        title, // Dynamically assign title
        userId // Dynamically assign userId
      };
      
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        
      );

      console.log("Todo added successfully:", response);
      return response;  // Return the response if successful
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;  // Throw the error if something goes wrong
    }
  },

  async getTodos(userId) {
    try {
      // Verify userId before making the query
      if (!userId) {
        throw new Error("User ID is required");
      }
  
      // Use the correct syntax for the equal query
      const query = [Query.equal("userId", userId)];
      console.log("Query being sent:", query);
  
      // Fetch todos based on userId
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        query
      );
  
      console.log("Todos fetched:", response.documents);
      return response.documents;
    } catch (error) {
      console.log("Error fetching todos:", error);
      throw error;
    }
  },
  async deleteTodo(todoId){
    try {
      await databases.deleteDocument(databaseId, collectionId, todoId); // Appwrite delete API
      console.log(`Todo with ID ${todoId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error; // Re-throw the error so the frontend can handle it
    }
  },
  async updateTodo (todoId, updatedData){
    try {
      const updatedTodo = await databases.updateDocument(
        databaseId,
        collectionId,
        todoId,
        updatedData // Pass the updated fields as an object
      );
      console.log("Todo updated successfully:", updatedTodo);
      return updatedTodo; // Return the updated todo
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error; // Re-throw the error to handle it in the frontend
    }
  },

};

export default todoService;
