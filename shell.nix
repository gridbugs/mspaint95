{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  packages = with pkgs; [ nodejs nodePackages.typescript-language-server ];
}
