import { Component, OnInit } from '@angular/core';
import { SkillTrackerService } from '../Service/skilltracker.service';
import { Associate } from '../shared/Associate';
import { Skills } from '../shared/Skills';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule  } from '@angular/forms'
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router'

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {
  skillForm: FormGroup;
  err: any;
  associate: Associate;
  skills: Skills[];
  name:string;
  associateID: string;
  email: string;
  mobile: string;
  gender: string;
  pic: any;
  status: string;
  level: string;
  remarks: string;
  others: string;
  strength: string;
  weakness: string;
  imageFile:File = null;
  bgPathImage: string = ""; 
  bgImage: string = ""; 
  id:number;
  ski:Skills;

  constructor(private _skillTrackerService: SkillTrackerService, private formBuilder: FormBuilder, 
                  private _http: HttpClient, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.callGetAllSkills();    
  }

  callGetAllSkills(){
    let self = this;
    self._skillTrackerService.GetAllSkills().subscribe(
      (skills:Skills[]) => {
          this.skills = skills;
          this.callGetAssociate();          
      },error =>{
          this.err = error;
      }      
    );
  }

  callGetAssociate(){
    this.id = this._skillTrackerService.subscribeData();

    let self = this;
    self._skillTrackerService.GetAssociate(this.id).subscribe(
      (associate:Associate) => {          
          this.associate = associate;
          this.id=associate.ID;
          this.name=associate.Name;
          this.associateID=associate.Associate_ID;
          this.email=associate.Email;
          this.mobile=associate.Mobile;
          this.gender=associate.Gender.trim()=='M'?'Male':(associate.Gender.trim()=='F'?'Female':'');
          this.status=associate.Status_Green == true? 'Green': (associate.Status_Blue == true ? 'Blue': (associate.Status_Red == true?'Red':null));
          this.level=associate.Level_1 == true? 'Level 1': (associate.Level_2 == true ? 'Level 2': (associate.Level_3 == true?'Level 3':null));;
          this.remarks=associate.Remark;
          this.others=associate.Other_Skills;
          this.strength=associate.Strength;
          this.weakness=associate.Weakness;
          this.bgPathImage = associate.Pic
          this.bgImage=this._skillTrackerService.serviceURL +'Images/'+associate.Pic;

          this.skills.forEach(skill => {
            this.ski=associate.Associate_Skills.filter(s=> s.Skill_ID === skill.Skill_ID)[0];
            if(this.ski === undefined){
              skill.Skill_Score = 0;
            }
            else{
              skill.Skill_Score = this.ski.Skill_Score;
            }
          });
      },error =>{
          this.err = error;
      }      
    );    
  }

  callDelete(){
    let self = this;
    self._skillTrackerService.DeleteAssociate(this.id)
      .subscribe(result => {
        this.router.navigate(['/skilldashboard']);
      }); 
  }

}
