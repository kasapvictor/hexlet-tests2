import Fakerator from 'fakerator';

const buildUser = (data = {}) => {
	const fakerator = Fakerator();
	const firstName = fakerator.internet.email();
	const lastName = fakerator.names.firstName();
	const email = fakerator.internet.email();
	const defaultData = {firstName, lastName, email};
	
	return {...defaultData, ...data};
};

test('Check Structure', () => {
	const expected = buildUser();
	expect(expected).toHaveProperty('email');
	expect(expected).toHaveProperty('firstName');
	expect(expected).toHaveProperty('lastName');
	expect(expected).not.toHaveProperty('year');
});

test('Check Uniq', () => {
	const expected = buildUser();
	const actual = buildUser();
	expect(actual.email).not.toEqual(expected.email);
	expect(actual.firstName).not.toEqual(expected.firstName);
	expect(actual.lastName).not.toEqual(expected.lastName);
});

test('Check Set Data', () => {
	const expected = buildUser({ firstName: 'Kolya' });
	const actual = buildUser({ firstName: 'Kolya' })
	expect(actual).not.toMatchObject(expected);
});

test('Check Set Data2', () => {
	const expected = buildUser({year: 20});
	const actual = buildUser()
	expect(expected).toHaveProperty('year');
});

test('Lector ->- buildUser fields', () => {
	const user1 = buildUser();
	expect(user1).toEqual(expect.objectContaining({
		email: expect.any(String),
		firstName: expect.any(String),
		lastName: expect.any(String),
	}));
});

test('Lector ->- buildUser random', () => {
	const user1 = buildUser();
	const user2 = buildUser();
	expect(user1).not.toEqual(user2);
});

test('Lector ->- buildUser override', () => {
	const newData1 = {
		email: 'test@email.com',
	};
	const user1 = buildUser(newData1);
	expect(user1).toMatchObject(newData1);
});
