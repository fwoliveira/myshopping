import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

// import { shoppingListExample } from '../../utils/shopping.list.data';
import firestore from '@react-native-firebase/firestore';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(()=>{
    firestore()
    .collection('products')
     .get()
     .then(response => {
      const data = response.docs.map( doc => {
        return {
          id: doc.id,
          ...doc.data()
      }}) as ProductProps[]
      setProducts(data);
     })
     .catch(error => console.error(error))
  },[])
  
  // useEffect(()=>{
  //  const subscribe = firestore()
  //   .collection('products')
  //    .onSnapshot(querySnapshot =>{
  //     const data = querySnapshot.docs.map( doc => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //     }}) as ProductProps[]
  //     setProducts(data);
  //    })
  //    return () =>subscribe()
  // },[])

  // useEffect(()=>{
  //   const subscribe = firestore()
  //    .collection('products')
  //     .doc('H215IzxCYM84EStkABdZ')
  //     .get()
  //     .then( response => console.log ({
  //       id: response.id,
  //       ...response.data()
  //     }) )
  //     setProducts(response.data);
  //  },[])


  //filtros

  // useEffect(()=>{
  //   const subscribe = firestore()
  //    .collection('products')
  //   //  .where('quantity','>',2)

  //   // limite de cosulta
  //     // .limit(3)

  //     // ordernar
  //     // .orderBy('description', 'desc')

  //     // a obrigacao do uso do orderBy
  //     .orderBy('quantity')
  //     .startAt(4)//com  //startAfter depois , startBefore antes
  //     .endAt(6)  //endAfter , endBefore

  //     .onSnapshot(querySnapshot =>{
  //      const data = querySnapshot.docs.map( doc => {
  //        return {
  //          id: doc.id,
  //          ...doc.data()
  //      }}) as ProductProps[]
  //      setProducts(data);
  //     })
  //     return () =>subscribe()
  //  },[])
  


  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
