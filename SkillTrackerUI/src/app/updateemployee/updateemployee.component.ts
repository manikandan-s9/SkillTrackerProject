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
          this.gender=associate.Gender!=null && associate.Gender!="" ? associate.Gender.trim():null;
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
    if(this.name=="" || this.name==undefined || this.associateID=="" || this.associateID==undefined || this.email=="" || this.email==undefined || this.mobile==""|| 
    this.mobile==undefined || this.gender==""|| this.gender==undefined || this.status=="" || this.status==undefined || this.level=="" || this.level==undefined)
    {
      
      var message= "Please fill the below manatory details\n\n ";
      if(this.name == "" || this.name == undefined)
      message+="- Name required\n "

      if(this.associateID == "" || this.associateID == undefined)
      message+="- Associate ID required\n "

      if(this.email == "" || this.email == undefined){
      message+="- Email required\n "
      } else {
        if(this.isEmailValid(this.email)){
          message+="- Invalid email format\n "
        }
      }
      if(this.mobile == "" || this.mobile == undefined)
      message+="- Mobile no. required\n "

      if(this.gender == "" || this.gender == undefined)
      message+="- Gender required\n "

      if(this.status == "" || this.status == undefined)
      message+="- Associate status required\n "

      if(this.level == "" || this.level == undefined)
      message+="- Associate level required\n "

      alert(message);
      return false;
    }
    else{
      var message= "Please fill the below manatory details\n\n ";
      if(this.isEmailValid(this.email)){
        message+="- Invalid email format\n "
        alert(message);
        return false;
      }
    }
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
              if(this.imageFile!=null && this.imageFile!=undefined && (this.bgPathImage==null || this.bgPathImage=="" || this.bgPathImage!=this.imageFile.name))
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

  isEmailValid(control) {  
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
      return regex.test(control) ? false : {  
          invalidEmail: true  
        };  
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
