import { Injectable, signal } from '@angular/core';
import type {
  InvestmentInput,
  InvestmentResult,
} from './investment-input.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  results = signal<InvestmentResult[] | undefined>(undefined);

  calculate(data: InvestmentInput) {
    const { duration, annualInvestment, initialInvestment, expectedReturn } =
      data;
    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.results.set(annualData);
  }
}
