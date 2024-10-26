// app/api/upload/route.js
import { storage, db } from "../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  const data = await req.json();
  const { file, userData } = data;

  const storageRef = ref(storage, `uploads/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    await setDoc(doc(db, "resources", Date.now().toString()), {
      ...userData,
      fileUrl: downloadURL,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
