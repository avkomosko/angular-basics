import { Pipe, PipeTransform } from '@angular/core';
import { Field, Post } from '../app.component';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], search: string = '', searchField: Field = 'title'): Post[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter(post => post[searchField].toLowerCase().includes(search.toLowerCase()));
  }

}
