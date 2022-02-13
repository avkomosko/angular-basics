import {Component, OnInit} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post, PostsService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      const id = + params['id'];
      this.post = this.postsService.getById(id)!;
    })
  }

  loadPost() {
    this.router.navigate(['/posts', 44])
  }
}
