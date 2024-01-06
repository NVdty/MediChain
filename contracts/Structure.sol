// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByDistributor,
        ShippedByManufacturer,
        ReceivedByDistributor,
        PurchasedByApotek,
        ShippedByDistributor,
        ReceivedByPengiriman,
        ShippedByPengiriman,
        ReceivedByApotek
    }
    struct ManufactureDetails {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string manufacturerLongitude;
        string manufacturerLatitude;
        string manufacturedDate;
    }
    struct ProductDetails {
        string productName;
        uint256 productCode;
        uint256 productPrice;
        string productCategory;
    }
    struct DistributorDetails {
        address thirdParty;
        string thirdPartyLongitude;
        string thirdPartyLatitude;
    }
    struct PengirimanDetails {
        address deliveryHub;
        string deliveryHubLongitude;
        string deliveryHubLatitude;
    }
    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ManufactureDetails manufacturer;
        DistributorDetails distributor;
        ProductDetails productdet;
        PengirimanDetails pengiriman;
        address apotek;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct Roles {
        bool Manufacturer;
        bool Distributor;
        bool Pengiriman;
        bool Apotek;
    }
}
