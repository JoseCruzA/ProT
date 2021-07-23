import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

/**
 * Class whit the logic for manage the about section
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class AboutComponent implements OnInit {
  selected: string;
  selectedImage?: string;

  constructor(private translateService: TranslateService) {
    this.selected = 'known';
  }

  ngOnInit(): void {}

  /**
   * Method that gets the selected image in a slider
   */
  getSelectedImage() {
    document.querySelectorAll("img").forEach(image => {
      if (image.classList.contains('is-active')) {
        this.selectedImage = image.id;
      }
    });
  }

  /**
   * Method that gets the text for i18n and insert it like html
   */
  getAboutText(): void {
    let p = document.querySelector('#royal-invest');

    this.translateService.get('about.invest-company').subscribe((res: string) => {
      p!.innerHTML = res;
    });

    this.translateService.get('about.our-company').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });

    this.translateService.get('about.commercial').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });

    this.translateService.get('about.package-created').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });
  }

  /**
   * Method that defines where is the page scroll when select a tab element
   *
   * @param selected the new selected tab
   */
  changeView(selected: string) {
    this.selected = selected;
    document.querySelector('.about-section')?.scrollIntoView();
    this.selectedImage = undefined;
  }

  /**
   * Method that change the active image in the slider
   *
   * @param img the click event in the tag element
   * @param max Maximum number of images in the slider
   */
  changeActiveImg(img: Event) {
    if (this.selectedImage == undefined) {
      this.getSelectedImage();
    }

    let selectedIdNumber =  parseInt(this.selectedImage?.split("-")[2] + "");

    let imgId = (img.target as Element).id;
    let imgClass = imgId.split("-")[0] + "-" + imgId.split("-")[1];
    let imgNumber = parseInt(imgId.split("-")[2] + "");
    imgNumber = Math.abs(imgNumber - selectedIdNumber) == 1 ? imgNumber : ((img.target as Element)?.classList.contains('is-left') ? selectedIdNumber - 1 : selectedIdNumber + 1);
    let image = document.querySelector("#" + imgClass + "-" + imgNumber);

    if (image?.classList.contains('is-left')) {
      let imageRight = document.querySelector("#" + imgClass + "-" + (imgNumber + 1));
      if (imageRight?.className.includes('is-active')) {
        imageRight.classList.remove('is-active');
        imageRight.classList.add('is-right');
        imageRight.setAttribute('style', 'z-index: 1')
        image?.classList.remove('is-left');
        image?.classList.add('is-active');
        image?.setAttribute('style', 'z-index: 2');
        this.selectedImage = image.id;
      }
    }

    if (image?.classList.contains('is-right')) {
      let imageLeft = document.querySelector("#" + imgClass + "-" + (imgNumber - 1));
      if (imageLeft?.className.includes('is-active')) {
        imageLeft.classList.remove('is-active');
        imageLeft.classList.add('is-left');
        imageLeft.setAttribute('style', 'z-index: 1')
        image?.classList.remove('is-right');
        image?.classList.add('is-active');
        image?.setAttribute('style', 'z-index: 2');
        this.selectedImage = image.id;
      }
    }
  }

}
