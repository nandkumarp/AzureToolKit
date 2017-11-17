import { Component, OnInit  } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../../common/models/computerVisionResponse';
import { ImagePostRequest } from '../../common/models/imagePostRequest';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })
 export class SearchComponent implements OnInit {
    searchResults: ImageResult[] | null;
    isSearching = false;
    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult;
    isAnalyzing = false;
    currentItemSaved: boolean = false;
    user: User;

    constructor(private userService: UserService, private cognitiveService: CognitiveService, private azureToolkitService: AzureToolkitService) { 
    }

     search(searchTerm: string) {
        this.searchResults = null;
        this.isSearching = true;
        this.currentAnalytics = null;

        this.cognitiveService.searchImages(searchTerm).subscribe(result => {
            this.searchResults = result.value;
            this.isSearching = false;
        });
    }

    analyze(result: ImageResult) {
        this.currentItem = result;
        this.currentItemSaved = false;
        this.currentAnalytics = null;
        this.isAnalyzing = true;
        this.cognitiveService.analyzeImage({ url: result.thumbnailUrl } as ComputerVisionRequest).subscribe(result => {
            console.log(result);
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });
        window.scroll(0, 0);
    }

    saveImage() {
        if (this.currentAnalytics == null) return;
        
        console.log("SaveImage called");
        
        console.log(this.user);
        console.log(this.currentItem);
        console.log(this.currentAnalytics);
        
        let transferObject: ImagePostRequest = {
            userId: this.user.userId,
            url: this.currentItem.thumbnailUrl,
            encodingFormat: this.currentItem.encodingFormat,
            id: this.currentItem.imageId,
            description: this.currentAnalytics.description.captions[0].text,
            tags: this.currentAnalytics.tags.map(tag => tag.name)
        };


        this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessful => {
            this.currentItemSaved = saveSuccessful;
        });
    }

    ngOnInit(): void {
        console.log("SearchController > getUser()");
        this.userService.getUser().subscribe(user => this.user = user );
        console.log(this.user);
    }
 }