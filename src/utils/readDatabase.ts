import admin from 'firebase-admin';

export interface PostProps {
  id: string;
  title: string;
  body: string;
}

export async function readDatabase() {
  const db = admin.firestore().collection('teste')
  
  const dbData =  db.get()
  .then(response => {
    const data = response.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }) as PostProps[];

    return data;
  })
  .catch(error => {
    console.log(error);
  });

  return dbData;
}