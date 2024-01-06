// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Structure.sol";

contract SupplyChain {
    event ManufacturerAdded(address indexed _account);

    //product code
    uint256 public uid;
    uint256 sku;

    address owner;

    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;
    mapping(address => Structure.Roles) roles;

    function hasManufacturerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Manufacturer;
    }

    function addManufacturerRole(address _account) public {
        require(_account != address(0));
        require(!hasManufacturerRole(_account));

        roles[_account].Manufacturer = true;
    }

    function hasDistributorRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Distributor;
    }

    function addDistributorRole(address _account) public {
        require(_account != address(0));
        require(!hasDistributorRole(_account));

        roles[_account].Distributor = true;
    }

    function hasPengirimanRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Pengiriman;
    }

    function addPengirimanRole(address _account) public {
        require(_account != address(0));
        require(!hasPengirimanRole(_account));

        roles[_account].Pengiriman = true;
    }

    function hasApotekRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Apotek;
    }

    function addApotekRole(address _account) public {
        require(_account != address(0));
        require(!hasPengirimanRole(_account));

        roles[_account].Apotek = true;
    }

    constructor() public payable {
        owner = msg.sender;
        sku = 1;
        uid = 1;
    }

    event Manufactured(uint256 uid);
    event PurchasedByDistributor(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByDistributor(uint256 uid);
    event PurchasedByApotek(uint256 uid);
    event ShippedByDistributor(uint256 uid);
    event ReceivedByPengiriman(uint256 uid);
    event ShippedByPengiriman(uint256 uid);
    event ReceivedByApotek(uint256 uid);

    modifier verifyAddress(address add) {
        require(msg.sender == add);
        _;
    }

    modifier manufactured(uint256 _uid) {
        require(products[_uid].productState == Structure.State.Manufactured);
        _;
    }

    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByManufacturer
        );
        _;
    }

    modifier receivedByDistributor(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByDistributor
        );
        _;
    }

    modifier purchasedByApotek(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByApotek
        );
        _;
    }

    modifier shippedByDistributor(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByDistributor
        );
        _;
    }

    modifier receivedByPengiriman(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByPengiriman
        );
        _;
    }

    modifier shippedByPengiriman(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByPengiriman
        );
        _;
    }

    modifier receivedByApotek(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByApotek
        );
        _;
    }

    function manufactureEmptyInitialize(Structure.Product memory product)
        internal
        pure
    {
        address thirdParty;
        string memory transaction;
        string memory thirdPartyLongitude;
        string memory thirdPartyLatitude;

        address deliveryHub;
        string memory deliveryHubLongitude;
        string memory deliveryHubLatitude;
        address apotek;

        product.distributor.thirdParty = thirdParty;
        product.distributor.thirdPartyLongitude = thirdPartyLongitude;
        product.distributor.thirdPartyLatitude = thirdPartyLatitude;

        product.pengiriman.deliveryHub = deliveryHub;
        product.pengiriman.deliveryHubLongitude = deliveryHubLongitude;
        product.pengiriman.deliveryHubLatitude = deliveryHubLatitude;

        product.apotek = apotek;
        product.transaction = transaction;
    }

    function manufactureProductInitialize(
        Structure.Product memory product,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) internal pure {
        product.productdet.productName = productName;
        product.productdet.productCode = productCode;
        product.productdet.productPrice = productPrice;
        product.productdet.productCategory = productCategory;
    }

    ///@dev STEP 1 : Manufactured a product.
    function manufactureProduct(
        string memory manufacturerName,
        string memory manufacturerDetails,
        string memory manufacturerLongitude,
        string memory manufacturerLatitude,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) public {
        require(hasManufacturerRole(msg.sender));
        uint256 _uid = uid;
        Structure.Product memory product;
        product.sku = sku;
        product.uid = _uid;
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufacturerDetails;
        product.manufacturer.manufacturerLongitude = manufacturerLongitude;
        product.manufacturer.manufacturerLatitude = manufacturerLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;

        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;

        manufactureEmptyInitialize(product);

        product.productState = Structure.State.Manufactured;

        manufactureProductInitialize(
            product,
            productName,
            productCode,
            productPrice,
            productCategory
        );

        products[_uid] = product;

        productHistory[_uid].history.push(product);

        sku++;
        uid = uid + 1;

        emit Manufactured(_uid);
    }

    ///@dev STEP 2 : Purchase of manufactured product by Third Party.
    function purchaseByDistributor(uint256 _uid) public manufactured(_uid) {
        require(hasDistributorRole(msg.sender));
        products[_uid].distributor.thirdParty = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByDistributor(_uid);
    }

    ///@dev STEP 3 : Shipping of purchased product to Third Party.
    function shipToDistributor(uint256 _uid)
        public
        verifyAddress(products[_uid].manufacturer.manufacturer)
    {
        require(hasManufacturerRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByManufacturer;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByManufacturer(_uid);
    }

    ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
    function receiveByDistributor(
        uint256 _uid,
        string memory thirdPartyLongitude,
        string memory thirdPartyLatitude
    )
        public
        shippedByManufacturer(_uid)
        verifyAddress(products[_uid].distributor.thirdParty)
    {
        require(hasDistributorRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].distributor.thirdPartyLongitude = thirdPartyLongitude;
        products[_uid].distributor.thirdPartyLatitude = thirdPartyLatitude;
        products[_uid].productState = Structure.State.ReceivedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByDistributor(_uid);
    }

    ///@dev STEP 5 : Purchase of a product at third party by Apotek.
    function purchaseByApotek(uint256 _uid)
        public
        receivedByDistributor(_uid)
    {
        require(hasApotekRole(msg.sender));
        products[_uid].apotek = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByApotek;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByApotek(_uid);
    }

    ///@dev STEP 7 : Shipping of product by third party purchased by apotek.
    function shipByDistributor(uint256 _uid)
        public
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].distributor.thirdParty)
    {
        require(hasDistributorRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByDistributor(_uid);
    }

    ///@dev STEP 8 : Receiveing of product by delivery hub purchased by apotek.
    function receiveByPengiriman(
        uint256 _uid,
        string memory deliveryHubLongitude,
        string memory deliveryHubLatitude
    ) public shippedByDistributor(_uid) {
        require(hasPengirimanRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].pengiriman.deliveryHub = msg.sender;
        products[_uid].pengiriman.deliveryHubLongitude = deliveryHubLongitude;
        products[_uid].pengiriman.deliveryHubLatitude = deliveryHubLatitude;
        products[_uid].productState = Structure.State.ReceivedByPengiriman;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByPengiriman(_uid);
    }

    ///@dev STEP 9 : Shipping of product by delivery hub purchased by apotek.
    function shipByPengiriman(uint256 _uid)
        public
        receivedByPengiriman(_uid)
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].pengiriman.deliveryHub)
    {
        require(hasPengirimanRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByPengiriman;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByPengiriman(_uid);
    }

    ///@dev STEP 10 : Shipping of product by delivery hub purchased by apotek.
    function receiveByApotek(uint256 _uid)
        public
        shippedByPengiriman(_uid)
        verifyAddress(products[_uid].apotek)
    {
        require(hasApotekRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByApotek;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByApotek(_uid);
    }

    ///@dev Fetch product
    function fetchProductPart1(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.uid,
            product.sku,
            product.owner,
            product.manufacturer.manufacturer,
            product.manufacturer.manufacturerName,
            product.manufacturer.manufacturerDetails,
            product.manufacturer.manufacturerLongitude,
            product.manufacturer.manufacturerLatitude
        );
    }

    ///@dev Fetch product
    function fetchProductPart2(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            Structure.State,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.manufacturer.manufacturedDate,
            product.productdet.productName,
            product.productdet.productCode,
            product.productdet.productPrice,
            product.productdet.productCategory,
            product.productState,
            product.distributor.thirdParty,
            product.distributor.thirdPartyLongitude
        );
    }

    function fetchProductPart3(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            string memory,
            address,
            string memory,
            string memory,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.distributor.thirdPartyLatitude,
            product.pengiriman.deliveryHub,
            product.pengiriman.deliveryHubLongitude,
            product.pengiriman.deliveryHubLatitude,
            product.apotek,
            product.transaction
        );
    }

    function fetchProductCount() public view returns (uint256) {
        return uid;
    }

    function fetchProductHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        return productHistory[_uid].history.length;
    }

    function fetchProductState(uint256 _uid)
        public
        view
        returns (Structure.State)
    {
        return products[_uid].productState;
    }

    function setTransactionHashOnManufacture(string memory tran) public {
        productHistory[uid - 1].history[
            productHistory[uid - 1].history.length - 1
        ]
            .transaction = tran;
    }

    function setTransactionHash(uint256 _uid, string memory tran) public {
        Structure.Product storage p =
            productHistory[_uid].history[
                productHistory[_uid].history.length - 1
            ];
        p.transaction = tran;
    }
}
