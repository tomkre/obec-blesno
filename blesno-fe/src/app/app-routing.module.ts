import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionComponent, SECTION_ID } from './section/section.component';
import { GuidepostComponent } from './section/guidepost/guidepost.component';
import { ArticleComponent, ARTICLE_ID } from './section/article/article.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuidepostComponent } from './admin/admin-guidepost/admin-guidepost.component';
import { ArticleListComponent } from './admin/list/article-list/article-list.component';
import { ArticleFormComponent } from './admin/form/article-form/article-form.component';
import { LoginComponent } from './admin/login/login.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { AttachmentFormComponent, ATTACHMENT_ID } from './admin/form/attachment-form/attachment-form.component';
import { AttachmentListComponent } from './admin/list/attachment-list/attachment-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
	{
        path: 'admin',
		component: AdminComponent,
		children: [
			// TODO: path: '' not working - find cause
            { path: 'guidepost', component: AdminGuidepostComponent, canActivate: [LoggedInGuard] },
			{ path: 'login', component: LoginComponent },
			{ path: 'articles', component: ArticleListComponent },
			{ path: 'articles/:' + ARTICLE_ID, component: ArticleFormComponent },
			{ path: 'attachments', component: AttachmentListComponent },
			{ path: 'attachments/:' + ATTACHMENT_ID, component: AttachmentFormComponent }
		]
	},
	{
		path: ':' + SECTION_ID,
		component: SectionComponent,
		children: [
			{ path: '', component: GuidepostComponent },
			{ path: ':' + ARTICLE_ID , component: ArticleComponent }
		],
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
