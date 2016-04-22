'use strict';

export function showPhotoBrowser (pic) {
    var myPhotoBrowserStandalone = window.application.photoBrowser({
        photos: pic
    });
    myPhotoBrowserStandalone.open();
};