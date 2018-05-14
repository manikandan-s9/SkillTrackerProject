import { Skills } from '../shared/Skills';
export class Associate {
    ID:number;
    Associate_ID: string;  
    Name: string;
    Email: string;
    Mobile: string;
    Pic: string|any;
    Status_Green: boolean;
    Status_Blue: boolean;
    Status_Red: boolean;
    Level_1: boolean;
    Level_2: boolean;
    Level_3: boolean;
    Remark: string;
    Strength: string;
    Weakness: string;
    Gender: string;
    Other_Skills: string;  
    Associate_Skills: Skills[]; 
    skills_List: string[];
    skills_join: string; 
}  