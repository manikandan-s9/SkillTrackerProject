import { Pipe, PipeTransform } from '@angular/core';
import { Associate } from '../shared/Associate';

@Pipe({  
    name: 'myfilter',
    pure: false
}) 

export class AssociateFilterPipe implements PipeTransform {  
    transform(items: Associate[], nameFilter: string, associateidFilter: string, emailFilter: string, mobileFilter: string, skillFilter: string): Associate[] {  
        if(items && items.length)
        {
        return items.filter(item => {
                if (nameFilter && item.Name.toLocaleLowerCase().indexOf(nameFilter.toLocaleLowerCase()) === -1){
                    return false;
                }
                if (associateidFilter && item.Associate_ID.toLocaleLowerCase().indexOf(associateidFilter.toLocaleLowerCase()) === -1){
                    return false;
                }
                if (emailFilter && item.Email.toLocaleLowerCase().indexOf(emailFilter.toLocaleLowerCase()) === -1){
                    return false;
                }
                if (mobileFilter && item.Mobile.toLocaleLowerCase().indexOf(mobileFilter.toLocaleLowerCase()) === -1){
                    return false;
                }
                if (skillFilter && item.skills_join.toLocaleLowerCase().indexOf(skillFilter.toLocaleLowerCase()) === -1){
                    return false;
                }
                  return true;              
                            })
        }
        else
        {
            return items;
        }                                    
    }
}