import {Component, OnInit} from '@angular/core';
import {ProduitsService} from "../../services/produits.service";
import Swal from "sweetalert2";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent  implements OnInit{
  constructor(private productService:ProduitsService) {
  }
  message:string='';
  public produits:any=[];
  filterdproduits:any=[];
  getproducts(){
    this.productService.getAllProduits().subscribe({
      next:(response)=>{
        this.message="success";
        this.produits=this.filterdproduits=response;
        this.paginateReclamations();
      }
    })
  }
ngOnInit(){
  this.getproducts();
}
paginatedReclamations:any=[];
  pageSize=3;
  currentPage=0;
handlePageEvent(event:PageEvent){
    this.pageSize=event.pageSize;
    this.currentPage=event.pageIndex;
    this.paginateReclamations();
}
  paginateReclamations(){
  const startIndex= this.currentPage * this.pageSize;
  const endIndex=startIndex+this.pageSize;
  this.paginatedReclamations = this.filterdproduits.slice(startIndex,endIndex)
  }
Ondeletereclamation(id:number | undefined){
    if(id!=null){
      Swal.fire({

        title:'étes-vous sur?',
        text:"Vous ne pourrez pas rev enir en arrière!",
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Oui, supprimez-le!'
      }).then((result)=>{
        if(result.isConfirmed){
          this.productService.deleteProduit(id).subscribe(
            data =>{
              Swal.fire('Supprimé!','Votre fichier a été supprimé.', 'success');
              this.filterdproduits=this.produits.filter((p:any)=> p.idProduit!==id);
              this.getproducts()
            }
          )
        }
      })
    }
  this.paginateReclamations();
}
selectetat:string='ALL';
filterproducts(){
  if(this.selectetat!==undefined && this.selectetat!=null && this.selectetat!='All'){
    const selectdEtatNumber= Number(this.selectetat)
    this.filterdproduits=this.produits.filter((produit:any)=>produit.etat===selectdEtatNumber);
  }else{
    this.filterdproduits=this.produits;
  }
  this.paginateReclamations();
}
}
