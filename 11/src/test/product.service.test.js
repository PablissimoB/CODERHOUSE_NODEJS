import { faker } from '@faker-js/faker'


export async function getMockProducts(req,res,next){
    const mockerProducts = []
        for (let i = 0; i < 100; i++) {
            mockerProducts.push({
                "_id": faker.string.uuid(),
                "title": faker.lorem.word(),
                "description": faker.lorem.words(),
                "price": faker.number.int({ min: 1, max: 100000 }), 
                "thumbnail": [],
                "code": faker.number.int().toString(),
                "stock": faker.number.int({ min: 1, max: 10000 }),
                "category": faker.lorem.word(),
                "status": true
          })
        }
        
        res.status(200).send(mockerProducts);
    }