describe('Сервер доступен по адресу:', function () {
	beforeEach(() => {
		cy.visit('/');
	})

	it('/recursion', function () {
		cy.get('[href*="/recursion"]').click();
		cy.contains('Строка');
	});

	it('/fibonacci', function () {
		cy.get('[href*="/fibonacci"]').click();
		cy.contains('Последовательность Фибоначчи');
	});

	it('/sorting', function () {
		cy.get('[href*="/sorting"]').click();
		cy.contains('Сортировка массива');
	});

	it('/stack', function () {
		cy.get('[href*="/stack"]').click();
		cy.contains('Стек');
	});

	it('/queue', function () {
		cy.get('[href*="/queue"]').click();
		cy.contains('Очередь');
	});
	
	it('/list', function () {
		cy.get('[href*="/list"]').click();
		cy.contains('Связный список');
	});
}); 