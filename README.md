# Service Management

Projenin amacı
React, TypeScript, Express.js ve PostgreSQL kullanılarak geliştirilen full-stack hizmet yönetim uygulaması.
React ve TypeScript kullanılarak geliştirilen bir frontend uygulamasını
Express.js tabanlı bir backend ve PostgreSQL veritabanı ile birleştirerek full-stack bir hizmet yönetim sistemi geliştirmektir.

Uygulama üzerinden hizmetlerin listelenmesi, yeni hizmet eklenmesi, mevcut hizmetlerin güncellenmesi ve silinmesi gibi temel
CRUD işlemleri gerçekleştirilmektedir. Müşterilerin randevu alıp hizmet sahibinin randevuyu yönetebilmesi ve google tablolara aktarabilmesi veya günün excel çıktısını alabilmesi amaçlanmıştır.

Proje aynı zamanda frontend ile backend arasındaki API iletişimini, PostgreSQL ile veri yönetimini, HTTP metotlarını, 
request/response yapısını ve backend tarafında temel veri doğrulama işlemlerini öğrenmek ve uygulamak amacıyla geliştirilmektedir.

## Technologies

Frontend
- React
- TypeScript
- Vite

Backend
- Node.js
- Express.js
- TypeScript

Database
- PostgreSQL

## Features

- Hizmetleri listeleme
- Yeni hizmet ekleme
- Hizmet fiyatını güncelleme
- Hizmet silme
- API üzerinden PostgreSQL ile veri yönetimi
- Request validation
- CORS

## Project Structure

service-management/
├── client/
└── server/

## API Endpoints

GET     /hizmetler
POST    /hizmetler
PUT     /hizmetler/:id
DELETE  /hizmetler/:id

## What I Learned

Burada projeyi yaparken öğrendiğin şeyleri yazacağız.

## Installation

Projeyi çalıştırma adımları

## Development Status

Şu an hangi özelliklerin tamamlandığını yazacağız.
