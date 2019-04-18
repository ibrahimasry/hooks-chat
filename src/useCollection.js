import { useState, useEffect } from "react";
import { db } from "./firebase";
export default function useCollection(path, orderBy, where) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let collection = db().collection(`users`);
    if (where) collection = collection.where(...where);
    if (orderBy) collection = collection.orderBy(orderBy);
    return collection.onSnapshot(snapShot => {
      const docs = [];
      snapShot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));

      setData(docs);
    });
  }, [path, ...where, orderBy]);
  return data;
}
