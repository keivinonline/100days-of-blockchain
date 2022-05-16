pragma solidity 0.7.5;
import "./Ownable.sol";

contract Destroyable is Ownable{
    function selfDestruct() public onlyOwner{
        // destroy the contract
        address payable receiver = msg.sender; 
        selfdestruct(receiver);
    }
}