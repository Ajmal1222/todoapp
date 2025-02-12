const conf = {
  appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDataBaseId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID) ,
  appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  //appwriteDataBaseId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default conf;




