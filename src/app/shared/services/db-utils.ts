import { QuerySnapshot } from "@angular/fire/firestore";

export function convertSnapshots<T>(result: QuerySnapshot) {
    return <T[]> result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }) 
    );
}