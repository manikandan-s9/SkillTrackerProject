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
  mobile: number;
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

  callReset(){
    this.name=null;
    this.associateID=null;
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
