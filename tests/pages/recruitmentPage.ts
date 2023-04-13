import { Page } from '@playwright/test';
import Constants from '../Utils/loginPage.json';
import { LoginPage } from './loginPage';

interface recruitmentPageLocators {
    recruitmentOption: string;
    addEmployeeButton: string;
    firstname: string;
    middlename: string;
    lastname: string;
    vacancy: string;
    email: string;
    contact: string;
    fileUpload: string;
    keywords: string;
    notes: string;
    admin: string;
    configuration: string;
    localization: string;
    language: string;
    userDropdown: string;
    logout: string;
    calendar: string;
    consentCheckbox: string;
    saveButton: string;
    assertNameField: string;
    assertVacancyField: string;
    toastMessage: string;
}

export class RecruitmentPage {
    readonly recruitmentPageLocators: recruitmentPageLocators;

    constructor() {
        this.recruitmentPageLocators = {
            recruitmentOption: '//span[text()="Recruitment"]',
            addEmployeeButton: '//button[text()=" Add "]',
            firstname: 'input[name="firstName"]',
            middlename: 'input[name="middleName"]',
            lastname: 'input[name="lastName"]',
            vacancy: '.oxd-select-text--after',
            email: '//div[label/text()="Email"]/following-sibling::div//input',
            contact: '//div[label/text()="Contact Number"]/following-sibling::div//input',
            fileUpload: 'input[type="file"]',
            keywords: '//div[label/text()="Keywords"]/following-sibling::div//input',
            notes: '//div[label/text()="Notes"]/following-sibling::div//textarea',
            admin: 'ul li:nth-of-type(1) a',
            configuration: 'ul .oxd-topbar-body-nav-tab:last-child',
            localization: '.oxd-dropdown-menu li:nth-of-type(3) a',
            language: '.oxd-form-row:first-child .oxd-select-text-input',
            userDropdown: '.oxd-userdropdown',
            logout: '.oxd-dropdown-menu li:last-child a',
            calendar: 'input[placeholder="yyyy-mm-dd"]',
            consentCheckbox: '//i[contains(@class,"oxd-icon bi-check")]',
            saveButton: '//button[text()=" Save "]',
            assertNameField: '//div[label/text()="Name"]/following-sibling::div//p',
            assertVacancyField: '//div[label/text()="Vacancy"]/following-sibling::div//p',
            toastMessage: 'p.oxd-text--toast-message'
        }
    }

    async changeLanguage(page: Page, loginPage: LoginPage) {
        await page.goto('auth/login');
        await loginPage.login(page);
        await page.locator(this.recruitmentPageLocators.admin).click();
        await page.locator(this.recruitmentPageLocators.configuration).click();
        await page.locator(this.recruitmentPageLocators.localization).click();
        await page.locator(this.recruitmentPageLocators.language).click();
        await page.getByRole('option', { name: 'English (United States)' }).getByText('English (United States)', { exact: true }).click();
        await page.locator(this.recruitmentPageLocators.userDropdown).click();
        await page.locator(this.recruitmentPageLocators.logout).click();
    }

    async goToAddCandidatePage(page: Page, loginPage: LoginPage) {
        await page.goto('auth/login');
        await loginPage.login(page);
        await page.locator(this.recruitmentPageLocators.recruitmentOption).click();
        await page.locator(this.recruitmentPageLocators.addEmployeeButton).click();
    }

    async selecDropdownOption(page: Page, role: any, optionValue: any) {
        await page.locator(this.recruitmentPageLocators.vacancy).click();
        await page.getByRole(role, { name: optionValue }).getByText(optionValue, { exact: true }).click();
    };

    async getToastMessage(page: Page) {
        return await page.locator(this.recruitmentPageLocators.toastMessage).textContent();
    }
}