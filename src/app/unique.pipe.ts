import {Injectable, Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";


// declare var _: any

@Pipe({
  name: 'uniqueFilter',
  pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(value: any, args: any): any {
    return _.uniqBy(value, args)
  }
}
