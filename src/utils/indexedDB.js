export const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ChatApp", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("messages")) {
          const store = db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
          store.createIndex("chatId", "chatId", { unique: false }); // Create an index for chatId
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  
  export const saveMessage = async (message) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("messages", "readwrite");
      const store = transaction.objectStore("messages");
      const request = store.add(message);
  
      transaction.oncomplete = () => resolve(message);
      transaction.onerror = (event) => reject(event.target.error);
    });
  };
  
  export const deleteMessage = async (id) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("messages", "readwrite");
      const store = transaction.objectStore("messages");
      const request = store.delete(id);
  
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = (event) => reject(event.target.error);
    });
  };
  
  export const getMessages = async (chatId) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("messages", "readonly");
      const store = transaction.objectStore("messages");
      const index = store.index("chatId");
  
      const request = index.getAll(chatId); // Use the index for filtering
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };
  