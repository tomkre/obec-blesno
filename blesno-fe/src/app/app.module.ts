import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { UpcomingEventsComponent } from './home/upcoming-events/upcoming-events.component';
import { NewsComponent } from './home/news/news.component';
import { PastEventsComponent } from './home/past-events/past-events.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { GuidepostComponent } from './section/guidepost/guidepost.component';
import { ArticleComponent } from './section/article/article.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuidepostComponent } from './admin/admin-guidepost/admin-guidepost.component';
import { ArticleListComponent } from './admin/list/article-list/article-list.component';
import { ArticleFormComponent } from './admin/form/article-form/article-form.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './admin/login/login.component';
import { AttachmentFormComponent } from './admin/form/attachment-form/attachment-form.component';
import { AttachmentListComponent } from './admin/list/attachment-list/attachment-list.component';
import { FileSizePipe } from './pipes/file-size.pipe';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CalendarComponent,
		UpcomingEventsComponent,
		NewsComponent,
		PastEventsComponent,
		FooterComponent,
		SectionComponent,
		GuidepostComponent,
		ArticleComponent,
		AdminComponent,
		AdminGuidepostComponent,
		ArticleListComponent,
		ArticleFormComponent,
		NoSanitizePipe,
		LoginComponent,
		AttachmentFormComponent,
		AttachmentListComponent,
		FileSizePipe
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		NoopAnimationsModule,
		FormsModule,
		HttpClientModule,
		AutoCompleteModule,
		ButtonModule,
		CarouselModule,
		DropdownModule,
        EditorModule,
        FileUploadModule,
		FullCalendarModule,
		GalleriaModule,
		InputTextModule,
        MenuModule,
		OverlayPanelModule,
        PanelMenuModule,
        PasswordModule,
        TabMenuModule,
		TreeModule,
        TableModule
	],
	providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
	bootstrap: [AppComponent]
})
export class AppModule { }
