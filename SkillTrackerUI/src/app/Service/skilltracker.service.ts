import { Injectable } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Associate } from '../shared/Associate';
import { Skills } from '../shared/Skills';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule  } from '@angular/forms'

@Injectable()
export class SkillTrackerService {
  private associateID: any;
  private Enable: boolean = false;
  serviceURL = "https://skilltrackerapi.azurewebsites.net/";

  constructor(private _http: Http, private http : HttpClient) { }

    publishData(data: any) {
        this.associateID = data;
    }
    subscribeData() {
        return this.associateID;
    }
    
    GetAllSkills() {     
        return this._http.get(this.serviceURL + "api/Skills")
            .map(response => {
                { 
                    return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    PostAddSkill(sname) { 
        const body = {Skill_Name: sname};
        return this._http.post(this.serviceURL + "api/Skills", body)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    UpdateSkill(sid, sname) {
        const body = {Skill_ID:sid, Skill_Name: sname};
        return this._http.put(this.serviceURL + "api/Skills/"+sid, body, {method:'PUT'})
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    DeleteSkill(sid) { 
        return this._http.delete(this.serviceURL + "api/Skills/"+ sid, {method:'DELETE'})
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    PostAddAssociate(associate) { 
        return this.http.post(this.serviceURL + "api/Associates", associate);
    }
    PostAddAssociateImage(associateID: number, imageFile: File) { 
        const fd: FormData=new FormData();
        fd.append('image', imageFile, imageFile.name);
        fd.append('AssociateID',associateID.toString());
        return this.http.post(this.serviceURL + "api/UploadImage", fd)
            .catch(error => Observable.throw(error.json()));
    }
    GetAssociate(id) {     
        return this._http.get(this.serviceURL + "api/Associates/"+id)
            .map(response => {
                { 
                    return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    UpdateAssociate(aid, associate) {
        return this._http.put(this.serviceURL + "api/Associates/"+aid, associate, {method:'PUT'})
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
    DeleteAssociate(aid) { 
        return this._http.delete(this.serviceURL + "api/Associates/"+ aid, {method:'DELETE'});
    }
    GetAllAssociates() {     
        return this._http.get(this.serviceURL + "api/Associates")
            .map(response => {
                { 
                    return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
}
