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
  orderBy,
  collectionSnapshots,
} from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { SubCategory, Discount, Tax } from '../pages/admin/menu/menu.component';
import { DataProvider } from '../providers/data.provider';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage = getStorage();
  constructor(private fs: Firestore, private dataProvider: DataProvider) {}

  setupBusiness(newProject: any) {
    return updateDoc(doc(this.fs, 'business/accounts'), {
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

  updateIngredientQuantity(quantity:number,finalPrice:number, id:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/ingredients/ingredients/' + id
      ),
      { quantity:quantity, finalPrice:finalPrice }
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

  addRecipeCategory(data:SubCategory){
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
        where('categories.name','==',category)
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

  getTablePromise(){
    return getDocs(collection(this.fs, 'business/accounts/' + this.dataProvider.currentProject?.projectId + '/tables/tables'));
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

  getRooms(){
    return collectionData(query(collection(this.fs, 'business/accounts/' + this.dataProvider.currentProject?.projectId + '/rooms/rooms'),orderBy('tableNo')), {idField:'id'});
  }
  
  getRoomsPromise(){
    return getDocs(query(collection(this.fs, 'business/accounts/' + this.dataProvider.currentProject?.projectId + '/rooms/rooms'),orderBy('tableNo')))
  }

  addRoom(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +  
          this.dataProvider.currentProject?.projectId +
          '/rooms/rooms'
      ),
      data
    );
  }
  

  bookRoom(roomId:string){
    return updateDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/rooms/rooms/' + roomId
      ),
      {isBooked:true}
    );
  }

  deleteRoom(id:string){
    return deleteDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/rooms/rooms/' + id
      )
    );
  }

  addMainCategory(data:any){
    return addDoc(collection(this.fs,'business/accounts/'+ this.dataProvider.currentProject?.projectId +'/recipes/categoryGroups'),data);
  }
  updateMainCategory(id:string,data:any){
    return updateDoc(doc(this.fs,'business/accounts/'+ this.dataProvider.currentProject?.projectId +'/recipes/categoryGroups/'+id),data);
  }
  getMainCategories(){
    return getDocs(collection(this.fs,'business/accounts/'+ this.dataProvider.currentProject?.projectId +'/recipes/categoryGroups'));
  }
  deleteMainCategory(id:string){
    return deleteDoc(doc(this.fs,'business/accounts/'+ this.dataProvider.currentProject?.projectId +'/recipes/categoryGroups/'+id));
  }

  getBalanceHitory(startDate:Date,endDate:Date){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/balanceHistory/balanceHistory'
        ),
        where('date','>=',startDate),
        where('date','<=',endDate),
        orderBy('date','desc')
      )
    );
  }
  
  async addBalanceHistory(data:any,items:any[]){
    const mainDoc = await addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/balanceHistory/balanceHistory'
      ),
      data
    );
    await Promise.all(items.map(async (item:any) => {
      await setDoc(
        doc(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/balanceHistory/balanceHistory/' + mainDoc.id + '/items/'+item.id
        ),
        item
      );
    }));
  }

  getBalanceHistoryIngredients(ingredientIds:string[],balanceSheetId:string){
    return Promise.all(ingredientIds.map(async (id:string) => {
      const document = await getDoc(doc(this.fs,'business/accounts/'+this.dataProvider.currentProject?.projectId+'/balanceHistory/balanceHistory/'+balanceSheetId+'/items/'+id));
      return document.data();
    }));
  }

  async addPurchaseHistory(data:any,items:any[]){
    const res = await addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/purchaseHistory/purchaseHistory'
      ),
      data
      );
    await Promise.all(items.map((item:any) => {
      console.log("adding item at "+'business/accounts/' + this.dataProvider.currentProject?.projectId + '/purchaseHistory/purchaseHistory/' + res.id + '/items/'+item.id);
      return setDoc(
        doc(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/purchaseHistory/purchaseHistory/' + res.id + '/items/'+item.id
        ),
        item
      );
    }));
  }

  getPurchasesHistory(startDate:Date,endDate:Date){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/purchaseHistory/purchaseHistory'
        ),
        where('date','>=',startDate),
        where('date','<=',endDate),
        orderBy('date','desc')
      )
    );
  }

  getPurchaseHistoryIngredients(ingredientIds:string[],purchaseId:string){
    return Promise.all(ingredientIds.map(async (id:string) => {
      const document = await getDoc(doc(this.fs,'business/accounts/'+this.dataProvider.currentProject?.projectId+'/purchaseHistory/purchaseHistory/'+purchaseId+'/items/'+id));
      return document.data();
    }));
  }

  async addStockHistory(data:any,items:any[]){
    const res = await addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/stockHistory/stockHistory'
      ),
      data
    );
    await Promise.all(items.map((item:any) => {
      return setDoc(
        doc(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/stockHistory/stockHistory/' + res.id + '/items/'+item.id
        ),
        item
      );
    }));
  }

  getStockHistory(startDate:Date,endDate:Date){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/stockHistory/stockHistory'
        ),
        where('date','>=',startDate),
        where('date','<=',endDate),
        orderBy('date','desc')
      )
    );
  }

  getStockHistoryIngredients(ingredientIds:string[],stockId:string){
    return Promise.all(ingredientIds.map(async (id:string) => {
      const document = await getDoc(doc(this.fs,'business/accounts/'+this.dataProvider.currentProject?.projectId+'/stockHistory/stockHistory/'+stockId+'/items/'+id));
      return document.data();
    }));
  }

  addDebugLog(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/debug/debug'
      ),
      data
    );
  }

  addFinalValueHistory(data:any){
    return addDoc(
      collection(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/finalValueHistory/finalValueHistory'
      ),
      data
    );
  }

  getFinalValueHistory(startDate:Date,endDate:Date){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/finalValueHistory/finalValueHistory'
        ),
        where('date','>=',startDate),
        where('date','<=',endDate),
        orderBy('date','desc')
      )
    );
  }

  getAllBills(startDate:Date,endDate:Date){
    return getDocs(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/bills/bills'
        ),
        where('date','>=',startDate),
        where('date','<=',endDate),
        orderBy('date','desc')
      )
    );
  }


  getCustomers() {
    return collectionSnapshots(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/bills/bills'
        ),
        where('customerInfoForm.phoneNumber', '!=', '')
      )
    );
  }

  getCancelledBills() {
    return collectionSnapshots(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/bills/bills'
        ),
        where('deleted', '==', true)
      )
    );
  }

  getCompletedBills(startDate:Date,endDate:Date) {
    return collectionSnapshots(
      query(
        collection(
          this.fs,
          'business/accounts/' +
            this.dataProvider.currentProject?.projectId +
            '/bills/bills'
        ),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
      )
    );
  }

  setQrSettings(data:any){
    return setDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/qrSettings'
      ),
      data
    );
  }

  getQrSettings(){
    return getDoc(
      doc(
        this.fs,
        'business/accounts/' +
          this.dataProvider.currentProject?.projectId +
          '/qrSettings'
      )
    );
  }
}
