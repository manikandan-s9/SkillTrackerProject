import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule, OnInit, ViewChild, ElementRef ,VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as  Highcharts from 'highcharts';
import  * as TreeMapChart from 'highcharts/modules/treemap';
TreeMapChart(Highcharts);
import { SkillTrackerService } from '../Service/skilltracker.service';
import { Associate } from '../shared/Associate';
import { Skills } from '../shared/Skills';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router'
import { AssociateFilterPipe } from './associate-filter.pipe'

@Component({
  selector: 'app-skilldashboard',
  templateUrl: './skilldashboard.component.html',
  styleUrls: ['./skilldashboard.component.css']
})
export class SkilldashboardComponent implements OnInit {
  skills: Skills[];
  associates:Associate[];
  name:string;
  associateID:string;
  email:string;
  mobile:string;
  skill:string;
  asso_skills:Skills[];
  totalAssociteRegistered:number;
  femaleAssociate:number;
  maleAssociate:number;
  freshAssociate:number;
  ratedAssociate:number;
  femaleRatedAssociate:number;
  maleRatedAssociate:number;
  level1Associate:number;
  level2Associate:number;
  level3Associate:number;
  @ViewChild("container", { read: ElementRef }) container: ElementRef;
  constructor(private _skillTrackerService: SkillTrackerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.callGetAllAssociates();
    this.callGetAllSkills();    
  }
  callGetAllSkills(){
    let self = this;
    self._skillTrackerService.GetAllSkills().subscribe(
      (skills:Skills[]) => {
          this.skills = skills; 
          this.callFillTreeMapChart();        
      });
  }
  callGetAllAssociates(){
    let self = this;
    self._skillTrackerService.GetAllAssociates().subscribe(
      (asso:Associate[]) => {
        this.associates = asso;
        if(asso!=null && asso!=undefined){
          this.totalAssociteRegistered = asso.length;
          this.femaleAssociate=(this.associates.filter(a=>a.Gender.trim()==="F").length*100)/asso.length;
          this.maleAssociate=(this.associates.filter(a=>a.Gender.trim()==="M").length*100)/asso.length;
          this.freshAssociate=(this.associates.filter(a=>a.Level_1===true).length*100)/asso.length;
          this.ratedAssociate=(this.associates.filter(a=>a.Associate_Skills.length > 0).length);
          this.femaleRatedAssociate=(this.associates.filter(a=>a.Associate_Skills.length > 0 && a.Gender.trim()==="F").length*100)/asso.length;
          this.maleRatedAssociate=(this.associates.filter(a=>a.Associate_Skills.length > 0 && a.Gender.trim()==="M").length*100)/asso.length;
          this.level1Associate=(this.associates.filter(a=>a.Level_1===true).length*100)/asso.length;
          this.level2Associate=(this.associates.filter(a=>a.Level_2===true).length*100)/asso.length;
          this.level3Associate=(this.associates.filter(a=>a.Level_3===true).length*100)/asso.length;
          this.associates.forEach(a => {
                a.skills_join = a.skills_List.join(', ');
          })
        }       
      },error =>{
      }      
    );
  }
  callInitEdit(aid){
    this._skillTrackerService.publishData(aid);
    this.router.navigate(['/updateemployee']);
  }
  callInitDelete(aid){
    let self = this;
    self._skillTrackerService.DeleteAssociate(aid).subscribe(
      (ass:any) => {
        this.callGetAllAssociates();
      }
    );
  }
  callInitView(aid){
    this._skillTrackerService.publishData(aid);
    this.router.navigate(['/viewemployee']);
  }
  callFillTreeMapChart(){    
    Highcharts.chart(this.container.nativeElement, {
    series: [{
        type: 'treemap',
        //layoutAlgorithm: 'stripes',
        data: this.getSkillCharData()
    }],
    title: {
        text: ''
    },
    chart: {
      height : 183
    },
    credits:{
      enabled:false
    }
    })
  }
  randomColorCode() {
    var text = "";
    var possible = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return "#"+text;
  }
  getSkillCharData(){
    var data=[];
    this.skills.forEach(s=>{
      data.push({
        name : s.Skill_Name,
        value : s.Associate_Skills.length,
        color : this.randomColorCode()
      })
    })
    return data;
  }
}
