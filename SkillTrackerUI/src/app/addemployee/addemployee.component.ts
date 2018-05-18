import { Component, OnInit } from '@angular/core';
import { SkillTrackerService } from '../Service/skilltracker.service';
import { Associate } from '../shared/Associate';
import { Skills } from '../shared/Skills';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule  } from '@angular/forms'
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router'

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  skillForm: FormGroup;
  err: any;
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
  bgImage: string = ""; 
  id:number;
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
          this.createSkillsSliders();         
      },error =>{
          this.err = error;
      }      
    );
  }

  createSkillsSliders(){
      this.skills.forEach(skill => {
            const control = new FormGroup({
                'Skill_ID': new FormControl(skill.Skill_ID),
                'Skill_Name': new FormControl(skill.Skill_Name),
                'Skill_Score': new FormControl(0)
            });
            (<FormArray>this.skillForm.get('skillslider')).push(control);
          });
  }

  callAddAssociate()
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
    const body = {Name: this.name, Associate_ID:this.associateID, 
                    Email:this.email, Gender:this.gender, Mobile:this.mobile,
                    Status_Green : this.status === 'G' ? true: false,
                    Status_Blue : this.status === 'B' ? true: false,
                    Status_Red : this.status === 'R' ? true: false,
                    Level_1 : this.level === 'L1' ? true: false,
                    Level_2 : this.level === 'L2' ? true: false,
                    Level_3 : this.level === 'L3' ? true: false,
                    Remark:this.remarks, Strength:this.strength,
                    Weakness:this.weakness, Other_Skills:this.others,
                    Associate_Skills :skill
                  };
    let self = this;
    self._skillTrackerService.PostAddAssociate(body)
      .subscribe(
      (assoc: Associate) => {
        this.id = assoc.ID;
          if(this.imageFile!=null && this.imageFile!=undefined)
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

  isEmailValid(control) {  
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
      return regex.test(control) ? false : {  
          invalidEmail: true  
        };  
  }

  callReset(){
    this.name=null;
    this.associateID="";
    this.email=null;
    this.mobile=null;
    this.gender=null;
    this.pic=null;
    this.status=null;
    this.level=null;
    this.remarks=null;
    this.others=null;
    this.strength=null;
    this.weakness=null;
    this.bgImage=null;
    const arrayControl = <FormArray>this.skillForm.controls['skillslider'];
    var arraLength = arrayControl.length
    for(var i = arraLength-1; i >= 0 ; i--){
      arrayControl.removeAt(i);
    }
    this.createSkillsSliders();
  }

}
