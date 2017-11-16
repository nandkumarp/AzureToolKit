import { Component } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../../common/models/computerVisionResponse';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })
 export class SearchComponent {
    searchResults: ImageResult[] | null;
    isSearching = false;
    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult | null;
    isAnalyzing = false;
    currentItemSaved: boolean = false;

     constructor(private cognitiveService: CognitiveService, private azureToolkitService: AzureToolkitService) { 
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
        if (this.currentItem)
        {
            let transferObject = {
                url: this.currentItem.thumbnailUrl,
                encodingFormat: this.currentItem.encodingFormat,
                id: this.currentItem.imageId
            }
            this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessful => {
                this.currentItemSaved = saveSuccessful;
            });
        }
    }
 }