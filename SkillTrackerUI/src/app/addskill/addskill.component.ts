import { Component, OnInit } from '@angular/core';
import { SkillTrackerService } from '../Service/skilltracker.service';
import { Skills } from '../shared/Skills';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  skills: Skills[];
  skill: string;
  skillID: number;
  constructor(private _skillTrackerService: SkillTrackerService) { }

  ngOnInit() {
    this.callGetAllSkills();
    this.Clear();
  }
  Clear()
  {
    this.skillID=0;
    this.skill="";
  }
  callInitEdit(SID, skil)  {
    this.skillID=SID;
    this.skill=skil;
  }
  callGetAllSkills(){
    let self = this;
    self._skillTrackerService.GetAllSkills().subscribe(
      (skills:Skills[]) => {
          this.skills = skills;
      },error =>{}      
    );
  }

  callAddSkill()  {
    if(this.skill=="")
    {
      alert("Skill Name Required.");
    }
    else
    {
      if(this.skillID<1)
      {
        let self = this;
        self._skillTrackerService.PostAddSkill(this.skill)
          .subscribe(
          skills => { 
                    this.callGetAllSkills(); 
          },
          error => {
          }
          ); 
      }
      else
      {
        let self = this;
        self._skillTrackerService.UpdateSkill(this.skillID, this.skill)
          .subscribe(
          skills => { 
                    this.callGetAllSkills();  
          },
          error => {
          }
          ); 
      }
      this.Clear();
    }
  }
  callDeleteSkill(sid)  {
    let self = this;
    self._skillTrackerService.DeleteSkill(sid)
      .subscribe(
      skills => { 
                this.callGetAllSkills(); 
      },
      error => {
      }
      ); 
      this.Clear();
  }
}
