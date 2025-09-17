import "@testing-library/jest-dom"
import "fast-text-encoding"

if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function(submitter) {
        if (submitter) {
            submitter.click()
        } else{
           const tmpSubmit = document.createElement('button');
            tmpSubmit.type = 'submit';
            tmpSubmit.style.display = 'none';
            this.appendChild(tmpSubmit);
            tmpSubmit.click();
            this.removeChild(tmpSubmit); 
        }
    }
}