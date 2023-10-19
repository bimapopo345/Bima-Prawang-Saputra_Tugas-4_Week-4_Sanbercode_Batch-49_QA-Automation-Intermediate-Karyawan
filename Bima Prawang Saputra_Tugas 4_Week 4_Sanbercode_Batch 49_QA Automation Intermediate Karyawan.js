const supertest = require('supertest');
const expect = require('chai').expect;

const baseURL = 'https://kasir-api.belajarqa.com';
const api = supertest(baseURL);

let accessToken = '';  // Variabel untuk menyimpan accessToken
let userId = '';  // Variabel untuk menyimpan userId

describe('Authorization and User CRUD Tests', function() {
    
    it('Should register a new user for authorization', async function() {
        const response = await api.post('/registration')
            .send({
                "name": "nama Toko",
                "email": "sample@ex.com",
                "password": "123adsfadf@"
            })
            .expect(201);
        
        console.log("Response from Registration:", JSON.stringify(response.body, null, 2));
        expect(response.body.status).to.equal('success');
    });

    it('Should login and get accessToken', async function() {
        const response = await api.post('/authentications')
            .send({
                "email": "sample@ex.com",
                "password": "123adsfadf@"
            })
            .expect(201);
        
        console.log("Response from Login:", JSON.stringify(response.body, null, 2));
        expect(response.body.status).to.equal('success');
        accessToken = response.body.data.accessToken;
    });

    // Menambahkan tes untuk endpoint "Create User"
    it('Should create a new user', async function() {
        const response = await api.post('/users')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                "name": "kasir-serbaguna",
                "email": "sample@example.com",
                "password": "123adsfadf@"
            })
            .expect(201);
        
        console.log("Response from Create User:", JSON.stringify(response.body, null, 2));
        
        // Memastikan bahwa respons memiliki status "success" dan pesan "User berhasil ditambahkan"
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('User berhasil ditambahkan');
        expect(response.body.data.name).to.equal('kasir-serbaguna');
        
        userId = response.body.data.userId;  // Menyimpan userId untuk tes selanjutnya
    });

    it('Should get user list', async function() {
        const response = await api.get('/users?q=kasir-serbaguna&p=1')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
        
        console.log("Response from Get User List:", JSON.stringify(response.body, null, 2));
        
        // Memastikan bahwa respons memiliki status "success"
        expect(response.body.status).to.equal('success');
        
        // Memastikan bahwa data pengguna diterima dalam array
        expect(response.body.data.users).to.be.an('array');
        
        // Memastikan bahwa meta data (informasi navigasi halaman) ada dan sesuai dengan format yang diharapkan
        expect(response.body.data.meta).to.have.all.keys('totalPages', 'total', 'page');
    });

        // Tes untuk "Update User"
        it('Should update a user', async function() {
            const response = await api.put(`/users/${userId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    "name": "update-user",
                    "email": "user@example.com"
                })
                .expect(200);
            
            console.log("Response from Update User:", JSON.stringify(response.body, null, 2));
            
            // Memastikan bahwa respons memiliki status "success" dan pesan yang sesuai
            expect(response.body.status).to.equal('success');
            expect(response.body.message).to.equal('User berhasil diupdate');
            
            // Memastikan bahwa nama pengguna telah diperbarui
            expect(response.body.data.name).to.equal('update-user');
        });
    
        // Tes untuk "Delete User"
        it('Should delete a user', async function() {
            const response = await api.delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            
            console.log("Response from Delete User:", JSON.stringify(response.body, null, 2));
            
            // Memastikan bahwa respons memiliki status "success" dan pesan yang sesuai
            expect(response.body.status).to.equal('success');
            expect(response.body.message).to.equal('User berhasil dihapus');
        });
    
        it('Should not create a user with missing fields', async function() {
            const response = await api.post('/users')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    "email": "missingFields@example.com"
                });
        
            console.log("Negative Response from Create User:", JSON.stringify(response.body, null, 2));
            expect(response.status).to.not.equal(201);
        });
        
        // Skenario negatif untuk "Get User List"
        it('Should not get user list without authorization', async function() {
            const response = await api.get('/users?q=kasir-serbaguna&p=1');
            
            console.log("Negative Response from Get User List:", JSON.stringify(response.body, null, 2));
            expect(response.status).to.not.equal(200);
        });
        
        // Skenario negatif untuk "Update User"
        it('Should not update a user without valid data', async function() {
            const response = await api.put(`/users/${userId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    "name": ""
                });
            
            console.log("Negative Response from Update User:", JSON.stringify(response.body, null, 2));
            expect(response.status).to.not.equal(200);
        });
        
        // Skenario negatif untuk "Delete User"
        it('Should not delete a user without authorization', async function() {
            const response = await api.delete(`/users/${userId}`);
            
            console.log("Negative Response from Delete User:", JSON.stringify(response.body, null, 2));
            expect(response.status).to.not.equal(200);
        });
});
