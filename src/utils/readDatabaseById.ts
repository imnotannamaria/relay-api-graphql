import admin from 'firebase-admin';

export async function readDatabaseById(id : string) {
  const db = admin.firestore().collection('posts')

  const dbData = await db.where('id', '==', id).get();
  
  if(dbData.empty){
    console.log('No matching documents.');
    return
  }
  else {
    const dbDataReturn = dbData.docs.map(doc => {      
      const data = doc.data()
      return data;
    });

    return dbDataReturn;
  }
}