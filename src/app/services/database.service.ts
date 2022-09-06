import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  query,
  updateDoc,
  where,
  collectionChanges,
  collectionData,
} from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Category, Discount, Tax } from '../pages/admin/menu/menu.component';
import { DataProvider } from '../providers/data.provider';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage = getStorage();
  constructor(private fs: Firestore, private dataProvider: DataProvider) {}

  setupBusiness(newProject: any) {
    return setDoc(doc(this.fs, 'business/accounts'), {
      projects: arrayUnion(newProject),
    });
  }

  addStockItem() {}

  getIngredients(){
    return getDocs(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients'
      )
    );
  }

  addIngredient(ingredient: any) {
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients'
      ),
      ingredient
    );
  }

  updateIngredient(ingredient: any, id: string) {
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients/' + id
      ),
      ingredient
    );
  }

  updateIngredientQuantity(quantity:number, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients/' + id
      ),
      { quantity:quantity }
    );
  }

  deleteIngredient(id:string){
    return deleteDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients/' + id
      ));
  }

  addIngredientCategory(category: string) {
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/categories'
      ),
      { categories: arrayUnion(category) }
    );
  }
  getIngredientCategories() {
    return getDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/categories'
      )
    );
  }

  addRecipeCategory(data:Category){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/recipes/categories'),
      data
    );
  }

  editRecipeCategory(data:any, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/recipes/categories/' + id
      ),
      data
    );
  }

  getRecipeCategories(){
    return getDocs(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/recipes/categories'
      )
    );
  }

  addKot(kotData:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/kots'
      ),
      kotData
    );
  }

  getTaxes(){
    return getDocs(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/taxes/taxes'
      )
    );
  }

  addTax(data:Tax){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/taxes/taxes'
      ),
      data
    );
  }

  updateTax(data:Tax, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/taxes/taxes/' + id
      ),
      data
    );
  }

  addRecipe(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/recipes/recipes'
      ),
      data
    );
  }

  updateRecipe(data:any, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/recipes/recipes/' + id
      ),
      data
    );
  }

  getRecipes(category:string){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/recipes/recipes'
        ),
        where('categories.id','==',category)
      )
    );
  }

  getDiscounts(){
    return getDocs(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/discounts/discounts'
      )
    );
  }

  addDiscount(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/discounts/discounts'
      ),
      data
    );
  }
  updateDiscount(data:Discount, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/discounts/discounts/' + id
      ),
      data
    );
  }

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      return false;
    }
  }


  getTables(){
    return collectionData(collection(this.fs, 'business/accounts/' + this.dataProvider.currentProject?.projectId + '/tables/tables'), {idField:'id'});
  }

  addTable(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/tables/tables'
      ),
      data
    );
  }
}
