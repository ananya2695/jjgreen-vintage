import { NgModule } from '@angular/core';
import { IoFormPaymentComponent } from './io-form-payment/io-form-payment';
import { IoFormPaymentoptionComponent } from './io-form-paymentoption/io-form-paymentoption';
@NgModule({
	declarations: [IoFormPaymentComponent,
    IoFormPaymentoptionComponent],
	imports: [],
	exports: [IoFormPaymentComponent,
    IoFormPaymentoptionComponent]
})
export class ComponentsModule {}
