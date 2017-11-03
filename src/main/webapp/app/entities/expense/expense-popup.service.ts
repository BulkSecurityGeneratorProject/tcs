import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Injectable()
export class ExpensePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private expenseService: ExpenseService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.expenseService.find(id).subscribe((expense) => {
                    if (expense.date) {
                        expense.date = {
                            year: expense.date.getFullYear(),
                            month: expense.date.getMonth() + 1,
                            day: expense.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.expenseModalRef(component, expense);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.expenseModalRef(component, new Expense());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    expenseModalRef(component: Component, expense: Expense): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expense = expense;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
