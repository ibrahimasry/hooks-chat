import { useState, useEffect } from "react";
import { db } from "./firebase";
const cache = {};

export default function useDocument(path) {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    let isMounted = true;
    if (author.name) return;
    const promise =
      cache[path] ||
      (cache[path] = db()
        .doc(path)
        .get());

    promise.then(authorDoc => {
      if (isMounted) {
        const getUser = { ...authorDoc.data(), id: authorDoc.id };

        setAuthor(getUser);
      }
    });

    return () => (isMounted = false);
  }, [path]);

  return author;
}
