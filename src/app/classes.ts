export namespace Classes {

  export class User {
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
    email: string;
    address: Address;
    company: Company;

    public static create(data: any): User {
      const model: User = new User;
      model.id = data['id'];
      model.name = data['name'];
      model.phone = data['phone'];
      model.username = data['username'];
      model.website = data['website'];
      model.email = data['email'];
      model.address = Address.create(data['address']);
      model.company = Company.create(data['company']);
      return model;
    }
  }

  export class Address {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: Geolocation;

    public static create(data: any): Address {
      const model: Address = new Address;
      model.city = data['city'] ? data['city'] : null;
      model.street = data['street'] ? data['street'] : null;
      model.suite = data['suite'] ? data['suite'] : null;
      model.zipcode = data['zipcode'] ? data['zipcode'] : null;
      model.geo = data['geo'] ? Geolocation.create(data['geo']) : null;
      return model;

    }
  }

  export class Company {
    bs: string;
    catchPhrase: string;
    name: string;

    public static create(data: any): Company {
      const model: Company = new Company;
      model.bs = data['bs'] ? data['bs'] : null;
      model.catchPhrase = data['catchPhrase'] ? data['catchPhrase'] : null;
      model.name = data['name'] ? data['name'] : null;
      return model;

    }
  }


  export class Geolocation {
    lat: number;
    lng: number;

    public static create(data: any): Geolocation {
      const model: Geolocation = new Geolocation();
      model.lat = data['lat'] ? data['lat'] : null;
      model.lng = data['lng'] ? data['lng'] : null;
      return model;
    }
  }

}
