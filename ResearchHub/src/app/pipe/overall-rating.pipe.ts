import { RatingModule } from 'ngx-rating';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overallRating'
})
export class OverallRatingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (Array.isArray(value)) {
      value.forEach(element => {
        var reviews = element.reviews
        if (reviews == undefined) {
          element.rating = 0
        } else {
          var count = 0
          var total = 0
          for (var key in reviews) {
            total += reviews[key].rating
            count ++
          }
          if (count == 0) {
            element.rating = 0
          } else {
            element.rating = total/count
          }
        }
      });
      return value;
    }
  }

}
