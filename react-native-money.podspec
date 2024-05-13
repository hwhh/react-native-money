#
# Be sure to run `pod lib lint RNMoneyInput.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
    s.name             = "react-native-money"
    s.version          = package['version']
    s.summary          = package['description']
    s.description      = package['description']
    s.homepage         = package['homepage']
    s.license          = package['license']
    s.author           = package['author']
    s.license          = { :type => 'MIT', :file => 'LICENSE' }
    s.source           = { :git => 'https://github.com/Fouppy/react-native-money.git', :tag => s.version.to_s }
    s.platform         = :ios, "13.4"
    s.source_files     = "ios/**/*.{h,m,mm,swift}"
    s.requires_arc     = true
    s.swift_version    = "5.0"
    s.dependency 'React-Core'
    s.dependency 'React-RCTText'

    if fabric_enabled
      s.dependency "React-utils"
      s.subspec "xxxutils" do |ss|
        ss.dependency "ReactCommon"
        ss.dependency "React-utils"
        ss.source_files         = "react/utils/**/*.{cpp,h}"
        ss.header_dir           = "react/utils"
        ss.pod_target_xcconfig  = { "HEADER_SEARCH_PATHS" => "\"${PODS_CONFIGURATION_BUILD_DIR}/React-utils/React_utils.framework/Headers\"" }
      end
    end

    install_modules_dependencies(s)
  end
