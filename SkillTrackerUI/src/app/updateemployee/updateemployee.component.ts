import { Component, OnInit } from '@angular/core';
import { SkillTrackerService } from '../Service/skilltracker.service';
import { Associate } from '../shared/Associate';
import { Skills } from '../shared/Skills';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule  } from '@angular/forms'
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router'

@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateemployeeComponent implements OnInit {
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
    this.skillForm = this.formBuilder.group({
      skillslider: this.formBuilder.array([])
    });
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
          this.gender=associate.Gender.trim();
          this.status=associate.Status_Green == true? 'G': (associate.Status_Blue == true ? 'B': (associate.Status_Red == true?'R':null));
          this.level=associate.Level_1 == true? 'L1': (associate.Level_2 == true ? 'L2': (associate.Level_3 == true?'L3':null));;
          this.remarks=associate.Remark;
          this.others=associate.Other_Skills;
          this.strength=associate.Strength;
          this.weakness=associate.Weakness;
          this.bgPathImage = associate.Pic
          this.bgImage=this._skillTrackerService.serviceURL +'Images/'+associate.Pic;


          this.skills.forEach(skill => {
            this.ski=associate.Associate_Skills.filter(s=> s.Skill_ID === skill.Skill_ID)[0];
            const control = new FormGroup({
                'Skill_ID': new FormControl(skill.Skill_ID),
                'Skill_Name': new FormControl(skill.Skill_Name),
                'Skill_Score': new FormControl((this.ski === undefined) ? 0: this.ski.Skill_Score)
            });
            (<FormArray>this.skillForm.get('skillslider')).push(control);
          });
      },error =>{
          this.err = error;
      }      
    );    
  }

  callUpdateAssociate()
  {    
    var skill =this.skillForm.get('skillslider').value;
    const body = {ID:this.id, Name: this.name, Associate_ID:this.associateID, 
                    Email:this.email, Gender:this.gender, Mobile:this.mobile,
                    Status_Green : this.status === 'G' ? true: false,
                    Status_Blue : this.status === 'B' ? true: false,
                    Status_Red : this.status === 'R' ? true: false,
                    Level_1 : this.level === 'L1' ? true: false,
                    Level_2 : this.level === 'L2' ? true: false,
                    Level_3 : this.level === 'L3' ? true: false,
                    Remark:this.remarks, Strength:this.strength,
                    Weakness:this.weakness, Other_Skills:this.others,
                    Associate_Skills :skill,
                    Pic: this.bgPathImage
                  };
      
        
    let self = this;
    self._skillTrackerService.UpdateAssociate(this.id, body)
      .subscribe(
      associate => {
              if(this.imageFile!=null && this.imageFile!=undefined && (this.bgPathImage==null && this.bgPathImage==""))
              {
                  self._skillTrackerService.PostAddAssociateImage(this.id, this.imageFile)
                    .subscribe(
                    skills => { 
                      this.router.navigate(['/skilldashboard']);
                    },
                    error => { }
                    ); 
              }
              else{
                this.router.navigate(['/skilldashboard']);
              }
          },
          error => { }
      );  
  }

  changeListener(event) : void {
    if (event.target.files && event.target.files[0]) {
      this.imageFile=event.target.files.item(0);
      var target:EventTarget;
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.bgImage = event.target.result;
      }
    }
  }

  callDelete(){
    let self = this;
    self._skillTrackerService.DeleteAssociate(this.id)
      .subscribe(result => {
        this.router.navigate(['/skilldashboard']);
      }); 
  }
}
