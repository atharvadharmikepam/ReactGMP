import { cy } from 'cypress';
import SearchForm from '../../src/components/SearchForm/SearchForm';

describe("SearchForm Component", () => {
    beforeEach(() => {
      cy.visit("/"); 
    });
  
    it("renders the input with the correct initial value", () => {
      cy.mount(<SearchForm initialQuery="test query" onSearch={cy.stub()} />);
      cy.get('input[placeholder="Search..."]').should("have.value", "test query");
    });
  
    it("calls onSearch with correct value when typing and clicking 'Search'", () => {
      const onSearch = cy.stub();
      cy.mount(<SearchForm onSearch={onSearch} />);
  
      cy.get('input[placeholder="Search..."]').type("Cypress Test");
      cy.get("button").contains("Search").click();
  
      cy.wrap(onSearch).should("have.been.calledOnceWith", "Cypress Test");
    });
  
    it("calls onSearch with correct value when typing and pressing Enter", () => {
      const onSearch = cy.stub();
      cy.mount(<SearchForm onSearch={onSearch} />);
  
      cy.get('input[placeholder="Search..."]').type("Enter Test{enter}");
  
      cy.wrap(onSearch).should("have.been.calledOnceWith", "Enter Test");
    });
  
    it("does not call onSearch when clicking 'Search' with an empty input", () => {
      const onSearch = cy.stub();
      cy.mount(<SearchForm onSearch={onSearch} />);
  
      cy.get("button").contains("Search").click();
  
      cy.wrap(onSearch).should("not.have.been.called");
    });
  
    it("does not call onSearch when pressing Enter with an empty input", () => {
      const onSearch = cy.stub();
      cy.mount(<SearchForm onSearch={onSearch} />);
  
      cy.get('input[placeholder="Search..."]').type("{enter}");
  
      cy.wrap(onSearch).should("not.have.been.called");
    });
  });
  