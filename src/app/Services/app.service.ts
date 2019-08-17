import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, switchMap, tap, delay, debounceTime, concat } from 'rxjs/operators';

import { API } from '../Config/api';
import { stringify } from 'query-string';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AppService {

  public _items$ = new BehaviorSubject<any[]>([]);
  public _title$ = new BehaviorSubject<any[]>([]);
  public _count$ = new BehaviorSubject<any[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _isFetch$ = new BehaviorSubject<boolean>(false);

  private _get$ = new Subject<void>();
  private _filter$ = new Subject<void>();
  
  public _myCart$ = new BehaviorSubject<any[]>([]);
  public _total$ = new BehaviorSubject<any>(0);
  public _itemsCartCount$ = new BehaviorSubject<number>(0);
  
  private _boughtItems : any = [];
  private _state: any = {
    searchTerm: {}
  };

  constructor(private http: HttpClient){ 
    // get all Items
    this._get$.pipe(
      switchMap(() => this.getItems()),
    ).subscribe(items => {
      this._items$.next(items.data);
      this._title$.next(items.title);
      this._count$.next(items.data.length);
    });
    this._get$.next();


    // do filter
    this._filter$.pipe(
      debounceTime(1000),
      tap(_ => this._isFetch$.next(true)),
      switchMap(() => this.filer(this._state.searchTerm)),
    ).subscribe(items => {
      this._items$.next(items.data);
      this._title$.next(items.title);
      this._count$.next(items.data.length);
    })

    // load cache if items have been bought
    if(localStorage.getItem('boughtItems')){
      this._boughtItems = JSON.parse(localStorage.getItem('boughtItems'));
      this.myCart();
    }
  }

  get loading$() { return this._loading$.asObservable(); }
  get isFetch$() { return this._isFetch$.asObservable(); }
  get myCart$() { return this._myCart$.asObservable(); }
  get items$() { return this._items$.asObservable(); }
  get itemsCartCount$() { return this._itemsCartCount$.asObservable(); }
  get title$() { return this._title$.asObservable(); }
  get count$() { return this._count$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  
  myCart(){
    let unitItems = this._boughtItems.reduce((a, c) => {
      let isExist = a.findIndex(i => i.id == c.id);
      if(isExist == -1){
        a.push(Object.assign({}, c));
      }
      else{
        a[isExist].buy = Math.min(a[isExist].buy + parseInt(c.buy), parseInt(c.inStock)*1000);
      }
      return a;
    }, []);
  
    // formart 
    // [{
    //  supplier: 'Can Tho Ogrin Farm 2',
    //  supplierId: 2,
    //  data: []
    // }]
    let myCart = unitItems.reduce((a, c) => {
      let isExist = a.findIndex(i => i.supplierId == c.supplierId);
      if(isExist == -1){
        a.push({
          supplier: c.supplier,
          supplierId: c.supplierId,
          data: [c]
        });
      }
      else{
        a[isExist].data.push(c);
      }
      return a;
    }, []);
    this._myCart$.next(myCart);
    this.setItemCart$(unitItems.length);
    this.setTotal$(unitItems);
    
    localStorage.setItem('boughtItems', JSON.stringify(this._boughtItems));
  }

  setItemCart$(number){
    this._itemsCartCount$.next(number);
  }

  setTotal$(myCart){
    let total = myCart.reduce((a, c) => a +=c.buy*c.price , 0)
    this._total$.next(total);
  }

  excute(cb?){
    let start = of(null);
    start.pipe(
      delay(API.timeElapsed),
    ).subscribe(() => {
      this.myCart();
      if(cb){
        cb();
      }
    });
  }
  
  handleDelete(item, cb){
    this._boughtItems = this._boughtItems.filter(i => i.id !== item.id);
    this.excute(cb);
  }

  handleAddItem(item, cb){
    this._boughtItems = this._boughtItems.filter(i => i.id !== item.id);
    this._boughtItems.push(item);
    this.excute(cb);
  }

  buyItem (item: any): Observable<any> {
    this._boughtItems.push(item);

    return this.http.post<any>(API.url.buyItem, item, httpOptions).pipe(
      debounceTime(1000),
      tap(() => this.log(`buyItem id=${item.id}`)),
      catchError(this.handleError<any>('buyItem', this.excute())),
      delay(API.timeElapsed),
    );
    
  }

  getItems (): Observable<any> {
    return this.http.get<any>(API.url.getAllItems)
      .pipe(
        tap(_ => {this._loading$.next(true);this.log('fetched data')}),
        catchError(this.handleError<any>('getItems', API.createDb())),
        delay(API.timeElapsed),
        tap(() => this._loading$.next(false))
      );
  }

  getItem(id: number): Observable<any> {
    if(this._items$.value.length){
      return of(API.getItem(id));
    }

    return this.http.get<any>(`${API.url.getAllItems}/${id}`).pipe(
      tap(_ => this.log(`get item  "${id}"`)),
      catchError(this.handleError<any>('getItem', API.getItem(id))),
      delay(API.timeElapsed)
    );
  }

  startFilter(obj){
    this._state.searchTerm = obj;
    this._filter$.next();
  }

  onSort(sort: any) {
    API.sort = sort;
    this._filter$.next();
  }

  filer(obj: any): Observable<any> {
    return this.http.get<any>(`${API.url.filter}?${stringify(obj)}`)
    .pipe(
      catchError(this.handleError<any>('filer', API.filter(obj))),
      delay(API.timeElapsed),
      tap(() => this._isFetch$.next(false))
    );
  }

  searchSuppier(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API.url.getAllItems}/${id}`).pipe(
      tap(_ => this.log(`search Supplier "${id}"`)),
      catchError(this.handleError<any[]>('searchSuppier', API.supplier(id)))
    );
  }

  addItem (item: any, cb?: Function): Observable<any> {
    return this.http.put<any>(API.url.addItem, item, httpOptions).pipe(
      tap(() => this.log(`addItem w/ id=${item.id}`)),
      catchError(this.handleError<any>('addItem', this.handleAddItem(item, cb) ))
    );
  }

  removeItem (item: any, cb?: Function): Observable<any> {
    return this.http.put<any>(API.url.removeItem, item, httpOptions).pipe(
      tap(() => this.log(`removeItem w/ id=${item.id}`)),
      catchError(this.handleError<any>('removeItem', this.handleAddItem(item, cb)))
    );
  }

  deleteItem(item: any , cb?: Function): Observable<any> {
    return this.http.delete<any>(`${API.url.deleteItem}/${item.id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted  id=${item.id}`)),
      catchError(this.handleError<any>('deleteItem', this.handleDelete(item, cb)))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (item: any): Observable<any> {
    return this.http.put(API.url.getAllItems, item, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${item.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`log : ${message}`);
  }
}